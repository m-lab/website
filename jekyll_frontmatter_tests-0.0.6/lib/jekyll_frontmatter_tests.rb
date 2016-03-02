require 'yaml'
class FrontmatterTests < Jekyll::Command
  class << self
    # Public: load the configuration file
    #
    # Assumes this is a standard jekyll site
    def config
      config = Jekyll.configuration
      if config.key('frontmatter_tests').nil?
        config['frontmatter_tests'] = {'path' => File.join("deploy", "tests", "schema")}
      end
      @config ||= config['frontmatter_tests']
    end

    # Public: Load a schema from file.
    #
    # file - a string containing a filename
    #
    # Used throughout to load a specific file. In the future the directories
    # where these schema files are located could be loaded from _config.yml
    #
    # Returns a hash loaded from the YAML doc or exits 1 if no schema file
    # exists.
    def loadschema(file)
      schema = File.join("deploy", "tests", "schema", file)
    	if File.exists?(schema)
        YAML.load_file(schema)
      else
        puts "No schema for #{file}"
        exit 1
      end
    end

    # Public: processes a collection against a schema
    #
    # schema - the hash-representation of a schema file
    #
    # Opens each file in the collection's expected directory and checks the
    # file's frontmatter for the expected keys and the expected format of the
    # values.
    #
    # Returns true or false depending on the success of the check.
    def process(schema)
    	dir = File.join(schema['config']['path'])
    	passfail = Array.new
    	Dir.open(dir).each do |f|
        next if File.directory?(File.join(dir, f))
    		file = File.open(File.join(dir, f))
    		unless schema['config']['ignore'].include?(f)
    			data = YAML.load_file(file)
    			passfail.push check_keys(data, schema.keys, f)
    			passfail.push check_types(data, schema)
    		end
    	end
      passfail.keep_if { |p| p == false }
    	if passfail.empty?
    		return true
    	else
        puts "There were #{passfail.count} errors".red
    		return false
    	end
    end

    # Public: checks a hash for expected keys
    #
    # target - the hash under test
    # keys - an array of keys the data is expected to have, usually loaded from
    #        a schema file by loadschema()
    # title - A string representing `data`'s name
    def check_keys(target, keys, title)
    	keys = keys - ['config']
    	unless target.respond_to?('keys')
    		puts "The file #{title} is missing all frontmatter.".red
    		return false
    	end
    	diff = keys - target.keys
      if diff.empty?
    		return true
    	else
    		puts "\nThe file #{title} is missing the following keys:".red
    		for k in diff
    			puts "    * #{k}".red
    		end
    		return false
    	end
    end

    # Public: tests all documents that are "posts"
    #
    # Loads a schema called _posts.yml and processes all post documents against
    # it.
    def test_posts
      puts 'testing posts'.green
      yepnope = Array.new.push process(loadschema('_posts.yml'))
      puts 'Finished testing'.green
      yepnope
    end

    # Public: Tests only specific collection documents
    #
    # collections - a comma separated string of collection names.
    #
    # `collections` is split into an array and each document is loaded and
    # processed against its respective schema.
    def test_collections(collections)
      yepnope = Array.new
      for c in collections
        puts "Testing #{c}".green
        yepnope.push process(loadschema("_#{c}.yml"))
        puts "Finished testing #{c}".green
      end
      yepnope
    end

    # Public: Tests all collections described by a schema file at
    # `deploy/tests/scema`
    def test_everything
      schema = Dir.open('deploy/tests/schema')
      yepnope = Array.new
      schema.each { |s|
        if s.start_with?('_')
          puts "Testing #{s}".green
          yepnope.push process(loadschema(s))
          puts "Finished testing #{s}".green
        end
      }
      yepnope
    end

    # Public: Processes options passed throguh the command line, runs
    # the appropriate tests.
    #
    # args - command line arguments (example: jekyll test [ARG])
    # options - command line options (example: jekyll test -[option] [value])
    #
    # Depending on the flag passed (see `init_with_program`), runs the expected # test.
    #
    # Example: the following comamnd `jekyll test -p` will pass ``{'posts' =>
    #          true}` as `options`. This will cause `test_frontmatter` to
    #          compare all docs in _posts with the provided schema.
    #
    # The test runner pushes the result of each test into a `results` array and # exits `1` if any tests fail or `0` if all is well.
    def test_frontmatter(args, options)
      puts 'starting tests'
      if options['posts']
        results = test_posts
      elsif options['collections']
        collections = options['collections'].split(',')
        results = test_collections(collections)
      else
        results = test_everything
      end
      unless results.find_index{ |r| r == false }
        puts 'Tests finished!'
        exit 0
      else
        puts "The test exited with errors, see above."
        exit 1
      end
    end

    # Internal: fired when `jekyll test` is run.
    #
    # When `jekyll test` runs, `test_frontmatter` is fired with options and args
    # passed from the command line.
    def init_with_program(prog)
      prog.command(:test) do |c|
        c.syntax "test [options]"
        c.description 'Test your site for frontmatter.'

        c.option 'posts', '-p', 'Target only posts'
        c.option 'collections', '-c [COLLECTION]', 'Target a specific collection'
        c.option 'all', '-a', 'Test all collections (Default)'

        c.action do |args, options|
          if options.empty?
            options = {"all" => true}
          end
          test_frontmatter(args, options)
        end
      end
    end
    # Internal: eventually, validate that the *values* match expected types
    #
    # For example, if we expect the `date` key to be in yyyy-mm-dd format, validate
    # that it's been entered in that format. If we expect authors to be an array,
    # make sure we're getting an array.
    def check_types(data, schema)
    	unless data.respond_to?('keys')
    		return false
    	end
    	for s in schema
    		key  = s[0]
    		if s[1].class == Hash
    			type = s[1]['type']
    		else
    			type = s[1]
    		end

    		if type == "Array" and data[key].class == Array
    			return true
    		elsif type == "String" and data[key].class == String
    			return true
    		elsif type == "Date"
    			return true
    		else
    			puts "    * Data is of the wrong type for key #{key}, expected #{type} but was #{data[key].class}\n\n"
    			return false
    		end
    	end
    end
  end
end

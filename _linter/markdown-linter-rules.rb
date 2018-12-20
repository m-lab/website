# Custom linter rules for M-Lab
#
# These rule names use the prefix "ML" for "Measurement Lab"
#  ----------------------------------------------------------------------------


rule "ML001", "Forbid non-HTTPS www.measurementlab.net links" do
  aliases "forbid-non-HTTPS-links"
  check do |doc|
    lines = doc.lines
    bad_lines = []
    i_line = 0
    while i_line < lines.length
      line = lines[i_line]
      if line.match(%r{http://www\.measurementlab\.net}i)
        bad_lines << i_line
      end
      i_line = i_line + 1      
    end
    bad_lines
  end
end

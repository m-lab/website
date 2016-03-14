#  Include all rules by default
all

#  Rule Modifications
#  --------------------------------
## MD029 mod - tells linter not to fail if order list items don't start with 1
rule 'MD029', :style => :ordered

#  Exclude these rules
#  --------------------------------
## MD001 - Check that Header levels increment by one level at a time.
exclude_rule 'MD001'

## MD013 - Line length.  Disabled unless can figure automated way to fix.
exclude_rule 'MD013'

## MD022 - Headers should be surrounded by blank lines
exclude_rule 'MD022'

## MD026 - Trailing punctuation in header
exclude_rule 'MD026'

## MD032 - Lists should be surrounded by blank lines
exclude_rule 'MD032'

## MD033 - Inline HTML - used for Markdown purists
exclude_rule 'MD033'

## MD034 - Bare URL used, meaning not enclosed in < >
exclude_rule 'MD034'

## MD026 - Emphasis used instead of a header
exclude_rule 'MD036'

### Load Data ------------------------------------------------------------------------
## Data from https://www.census.gov/data/tables/2016/econ/asm/2016-asm.html

manufacturingDT <- data.table::fread('./ASM_2016_31GS101_with_ann.csv')

### Clean Data ------------------------------------------------------------------------
## Clean column names
plain_text_names <- as.character(unlist(manufacturingDT[1,]))
plain_text_names <- gsub(' ', '_', plain_text_names)
plain_text_names <- gsub('[(]%[)]', 'percent', plain_text_names)
plain_text_names <- gsub('_[(]\\$1,000[)]', '', plain_text_names)

plain_text_names <- gsub('[(/)]', '', plain_text_names)

names(manufacturingDT) <- as.character(plain_text_names)
manufacturingDT <- manufacturingDT[-1,]

## Drop percent columns
percent_columns <- grep('percent', as.character(plain_text_names))
manufacturingDT[, c(percent_columns):=NULL ]
manufacturingDT[, Id2 := NULL]

nonNumericCols <- c('Geographic_identifier_code', 'Geographic_area_name', '2012_NAICS_code', 'Meaning_of_2012_NAICS_code')
nonNumericsDT <- manufacturingDT[, .(nonNumericCols)]
manufacturingDT <- manufacturingDT[, lapply(.SD, as.numeric), .SDcols = !c('Geographic_identifier_code', 'Geographic_area_name', 'Meaning_of_2012_NAICS_code')]

manufacturingDT

library(rjson)
manufacturingJSON <- toJSON(unname(split(manufacturingDT, 1:nrow(manufacturingDT))))
cat(manufacturingJSON)

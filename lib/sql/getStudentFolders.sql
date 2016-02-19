SELECT
    ca_unoffdesc as id
  FROM
    PROD360.dbo.ca_case
  WHERE
    ca_unoffdesc
  LIKE
    'Elevmappe -%'
  ORDER BY
    ca_unoffdesc



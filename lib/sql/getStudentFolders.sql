SELECT
    ca_unoffdesc as id
  FROM
    PROD360.dbo.ca_case
  WHERE
    ca_unoffdesc
  LIKE
    'Elevmappe -%'
  AND
    ca_closeddate IS NULL
  ORDER BY
    ca_unoffdesc



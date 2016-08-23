SELECT
    ca_unoffdesc as tittel, COUNT(*) as antall
  FROM
    PROD360.dbo.ca_case
  WHERE
    ca_unoffdesc
  LIKE
    'Elevmappe -%'
  AND
    ca_closeddate IS NULL
  GROUP BY
    ca_unoffdesc
  HAVING
    COUNT(*) > 1

SELECT distinct
  min(ct_referencenumber) as id
  FROM PROD360.dbo.ct_contact
  GROUP BY ct_referencenumber
  HAVING (COUNT(ct_referencenumber) > 1)
  order by id

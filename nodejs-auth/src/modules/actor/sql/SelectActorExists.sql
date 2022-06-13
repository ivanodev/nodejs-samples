select
  id,
  "actorType",
	case
		count(id) when 0 then false
		else true
	end as "actorExist"
from
	actor
where
	id = :actorId
group by id
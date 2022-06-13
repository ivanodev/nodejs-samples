select
	a.id,
	a."firstName",
	a."lastName",
	a."actorType",
	a."personType",
	a."email",
	u."login",
	case
		a."isActive" when 1 then true
		else false
	end "isActive",
	case
		u."activeUser" when 1 then true
		else false
	end "activeUser",
	case
		u."confirmedUser" when 1 then true
		else false
	end "confirmedUser"
from
	actor a
left join "user" u on
	u.id = a.id
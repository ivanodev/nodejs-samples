select
	u.id,
	u."login",
	u."password" ,
	u."randomPassword",
	u."randomPasswordExpiresAt",
	u."token",
	u."activeUser",
	u."confirmedUser",
	u."lastAccess",
	a."firstName",
	a."lastName",
	a."actorType",
	a."personType",
	a."email",
	a."isActive",
	a."createdAt",
	a."createdBy",
	a."updatedAt",
	a."updatedBy",
	a."deactivatedAt",
	a."deactivatedBy",
	r.id as "roleId",
	r."name",
	r."description"
from
	"user" u
inner join "actor" a on
	u.id = a.id and '2' = any(a."actorType")
left join userRole ur on
	"u".id = ur."userId"
left join "role" r on 
	r.id = ur."roleId" 
where
	u.id = :userId
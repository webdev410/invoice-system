SELECT
    `user`.`id`,
    `user`.`username`,
    `user`.`email`,
    `user`.`password`,
    `profile`.`id` AS `profile.id`,
    `profile`.`company_name` AS `profile.company_name`,
    `profile`.`address_1` AS `profile.address_1`,
    `profile`.`address_2` AS `profile.address_2`,
    `profile`.`city` AS `profile.city`,
    `profile`.`state` AS `profile.state`,
    `profile`.`zip_code` AS `profile.zip_code`,
    `profile`.`user_id` AS `profile.user_id`
FROM
    `user` AS `user`
    LEFT OUTER JOIN `profile` AS `profile` ON `user`.`id` = `profile`.`user_id`
WHERE
    `user`.`id` = 1;
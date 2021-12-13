DROP VIEW IF EXISTS gym.slots_with_current_reservation_V;
CREATE VIEW gym.slots_with_current_reservation_V AS
    SELECT s.*, count(w.*) as current_reservations FROM gym.slots s left join gym.weight_room_reservations w on s.id = w.slot
    group by id, date, time_from, time_to, max_capacity;

DROP VIEW IF EXISTS gym.there_Is_Space_In_Slot_View;
CREATE VIEW gym.there_Is_Space_In_Slot_View AS
SELECT slotReservations.id FROM gym.slots_with_current_reservation_V as slotReservations
where max_capacity>current_reservations;

DROP VIEW IF EXISTS gym.lessons_with_current_reservation_V;
CREATE VIEW gym.lessons_with_current_reservation_V AS
SELECT l.id, l.date, l.time, l.max_participants, count(lr.*) as current_reservations, c.name as course, c.description as course_description
FROM gym.lessons l
    left join gym.lesson_reservation lr on l.id = lr.lesson
    inner join gym.courses c on c.id = l.course
group by l.id, date, time, max_participants, c.name, c.description;

DROP VIEW IF EXISTS gym.there_Is_Space_In_Lesson_View;
CREATE VIEW gym.there_Is_Space_In_Lesson_View AS
SELECT  lessonReservations.id FROM gym.lessons_with_current_reservation_V as lessonReservations
where max_participants>current_reservations;

DROP VIEW IF EXISTS gym.user_With_All_Reservations;
CREATE VIEW gym.user_With_All_Reservations AS
SELECT 'lesson' as reservation_type,r.id,r.date,r.time,r.customer,l.reservation_id,l.lesson as slot
FROM gym.reservations r
    RIGHT JOIN gym.lesson_reservation l on r.id = l.reservation_id
UNION ALL
SELECT 'weightroom' as reservation_type,* FROM gym.reservations r
    RIGHT JOIN gym.weight_room_reservations on r.id = weight_room_reservations.reservation_id;

INSERT INTO gym.slots values (gen_random_uuid(),'2021-12-25', '08:00:00', '12:00:00', 60, 'Titolo Slot', 'Descrizione slot');
INSERT INTO gym.slots values (gen_random_uuid(),'2021-12-25', '12:00:00', '16:00:00', 80, 'Titolo Slot', 'Descrizione slot');
INSERT INTO gym.slots values (gen_random_uuid(),'2021-12-25', '16:00:00', '20:00:00', 90, 'Titolo Slot', 'Descrizione slot');
INSERT INTO gym.slots values (gen_random_uuid(),'2021-12-23', '08:00:00', '12:00:00', 60, 'Titolo Slot', 'Descrizione slot');
INSERT INTO gym.slots values (gen_random_uuid(),'2021-12-23', '12:00:00', '16:00:00', 80, 'Titolo Slot', 'Descrizione slot');
INSERT INTO gym.slots values (gen_random_uuid(),'2021-12-22', '10:00:00', '11:00:00', 90, 'Titolo Slot', 'Descrizione slot');
INSERT INTO gym.slots values (gen_random_uuid(),'2021-12-21', '08:00:00', '12:00:00', 10, 'Titolo Slot', 'Descrizione slot');
INSERT INTO gym.slots values (gen_random_uuid(),'2021-12-21', '12:00:00', '16:00:00', 20, 'Titolo Slot', 'Descrizione slot');
INSERT INTO gym.slots values (gen_random_uuid(),'2021-12-21', '16:00:00', '20:00:00', 30, 'Titolo Slot', 'Descrizione slot');

INSERT INTO gym.users (id, name, surname, birth_date, fiscal_code, phone, role, email, password) VALUES ('xiloID', 'xilo', 'xilo', null, null, null, 'trainer', 'trainer', :PWD);
INSERT INTO gym.users (id, name, surname, birth_date, fiscal_code, phone, role, email, password) VALUES ('ivanID', 'ivan', 'ivan', null, null, null, 'customer', 'customer', :PWD);
INSERT INTO gym.users (id, name, surname, birth_date, fiscal_code, phone, role, email, password) VALUES ('floID', 'flo', 'flo', null, null, null, 'manager', 'manager', :PWD);
INSERT INTO gym.users (id, name, surname, birth_date, fiscal_code, phone, role, email, password) VALUES ('adminID', 'admin', 'admin', null, null, null, 'admin', 'admin', :PWD);


INSERT INTO gym.courses VALUES ('CyberRobicsCourseID', 'CyberRobics', 'You also have to be lifting heavy weights', 'xiloID');
INSERT INTO gym.courses VALUES ('CrossFitCourseID', 'CrossFit', 'You also have to do crossift', 'xiloID');

INSERT INTO gym.lessons VALUES (gen_random_uuid(), '2021-12-25', '8:00:00', 30, 'CyberRobicsCourseID');
INSERT INTO gym.lessons VALUES (gen_random_uuid(), '2021-12-23', '9:00:00', 20, 'CyberRobicsCourseID');
INSERT INTO gym.lessons VALUES (gen_random_uuid(), '2021-12-22', '10:00:00', 40, 'CrossFitCourseID');
INSERT INTO gym.lessons VALUES (gen_random_uuid(), '2021-12-19', '11:00:00', 50, 'CrossFitCourseID');
INSERT INTO gym.lessons VALUES (gen_random_uuid(), '2021-12-19', '12:00:00', 20, 'CrossFitCourseID');


INSERT INTO gym.subscriptions VALUES ('abbonamentoDiIvan', '2021-11-19', '2022-11-19', 2000.15, 'ivanID');
--INSERT INTO gym.transactions VALUES (gen_random_uuid(), '2021-12-28', '16:00:00', 'acqua', 'abbonamentoDiIvan');
--INSERT INTO gym.transactions VALUES (gen_random_uuid(), '2021-12-28', '17:00:00', 'felpa', 'abbonamentoDiIvan');
--INSERT INTO gym.transactions VALUES (gen_random_uuid(), '2021-12-22', '19:00:00', 'proteine', 'abbonamentoDiIvan');


INSERT INTO gym.accesses VALUES (gen_random_uuid(), '2021-12-22', '19:00:00', '20:00:00', 'ivanID');
INSERT INTO gym.accesses VALUES (gen_random_uuid(), '2021-12-21', '19:00:00', '20:00:00', 'ivanID');
INSERT INTO gym.accesses VALUES (gen_random_uuid(), '2021-12-22', '19:00:00', '20:00:00', 'floID');
INSERT INTO gym.accesses VALUES (gen_random_uuid(), '2021-12-21', '19:00:00', '20:00:00', 'floID');
INSERT INTO gym.accesses VALUES (gen_random_uuid(), '2021-12-22', '19:00:00', '20:00:00', 'xiloID');
INSERT INTO gym.accesses VALUES (gen_random_uuid(), '2021-12-21', '19:00:00', '23:00:00', 'xiloID');
INSERT INTO gym.accesses VALUES (gen_random_uuid(), '2021-12-11', '19:00:00', '22:00:00', 'ivanID');
INSERT INTO gym.accesses VALUES (gen_random_uuid(), '2021-12-10', '19:00:00', '21:00:00', 'ivanID');
INSERT INTO gym.accesses VALUES (gen_random_uuid(), '2021-12-11', '19:00:00', '23:00:00', 'floID');
INSERT INTO gym.accesses VALUES (gen_random_uuid(), '2021-12-12', '19:00:00', '21:00:00', 'floID');
INSERT INTO gym.accesses VALUES (gen_random_uuid(), '2021-12-11', '19:00:00', '22:00:00', 'xiloID');
INSERT INTO gym.accesses VALUES (gen_random_uuid(), '2021-12-12', '19:00:00', '21:00:00', 'xiloID');
--adminID
INSERT INTO gym.accesses VALUES (gen_random_uuid(), '2021-12-10', '19:00:00', '21:00:00', 'adminID');
INSERT INTO gym.accesses VALUES (gen_random_uuid(), '2021-12-11', '19:00:00', '22:00:00', 'adminID');
INSERT INTO gym.accesses VALUES (gen_random_uuid(), '2021-12-12', '19:00:00', '21:00:00', 'adminID');

INSERT INTO gym.policies VALUES ('policyId', 'Any member who incurs an injury or becomes dizzy/ill while using the centers should immediately contact a Fitness Center staff person for assistance. A first aid kit is kept at the front desk for minor injuries. In cases requiring more extensive first aid, fitness center staff will contact the appropriate persons for assistance. It is important that fitness center staff be notified of any cases of injury or illness so that proper procedures can be initiated. Athletic tape may only be used for minor injuries.', NOW(), '2023-12-25');
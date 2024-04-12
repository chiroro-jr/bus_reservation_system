-- Harare/Vic Falls Trips
insert into trips (route_id, departure_time, arrival_time, total_seats)
values
    ((select id from routes where slug = 'victoria-falls-to-harare'), '0800', '2000', 50),
    ((select id from routes where slug = 'victoria-falls-to-harare'), '1000', '0000', 50),
    ((select id from routes where slug = 'victoria-falls-to-harare'), '1800', '0300', 50),
    ((select id from routes where slug = 'victoria-falls-to-harare'), '2000', '0800', 50),
    ((select id from routes where slug = 'harare-to-victoria-falls'), '0800', '2000', 50),
    ((select id from routes where slug = 'harare-to-victoria-falls'), '1000', '0000', 50),
    ((select id from routes where slug = 'harare-to-victoria-falls'), '1800', '0300', 50),
    ((select id from routes where slug = 'harare-to-victoria-falls'), '2000', '0800', 50);

-- Harare/Masvingo Trips
insert into trips (route_id, departure_time, arrival_time, total_seats)
values
    ((select id from routes where slug = 'harare-to-masvingo'), '0800', '1200', 50),
    ((select id from routes where slug = 'harare-to-masvingo'), '1200', '1600', 50),
    ((select id from routes where slug = 'harare-to-masvingo'), '1400', '1800', 50),
    ((select id from routes where slug = 'masvingo-to-harare'), '0800', '1200', 50),
    ((select id from routes where slug = 'masvingo-to-harare'), '1200', '1600', 50),
    ((select id from routes where slug = 'masvingo-to-harare'), '1400', '1800', 50);

-- Harare/Chimanimani Trips
insert into trips (route_id, departure_time, arrival_time, total_seats)
values
    ((select id from routes where slug = 'chimanimani-to-harare'), '0800', '1200', 50),
    ((select id from routes where slug = 'chimanimani-to-harare'), '1200', '1600', 50),
    ((select id from routes where slug = 'chimanimani-to-harare'), '1400', '1800', 50),
    ((select id from routes where slug = 'harare-to-chimanimani'), '0800', '1200', 50),
    ((select id from routes where slug = 'harare-to-chimanimani'), '1200', '1600', 50),
    ((select id from routes where slug = 'harare-to-chimanimani'), '1400', '1800', 50);
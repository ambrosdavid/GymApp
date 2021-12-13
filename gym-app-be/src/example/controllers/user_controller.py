from ..models import Users, Courses, Policies, Accesses
from .. import app, database
from datetime import datetime
from ..response import Response, DATE_FORMAT, DATE_FORMAT_IN, TIME_FORMAT
from ..utils.dateutils import format_date, format_time


def parse_me(user: Users):
    return {
        "name": user.name,
        "surname": user.surname,
        "role": user.role,
        "email": user.email,
        "birth_date": user.birth_date,
        "fiscal_code": user.fiscal_code,
        "phone": user.phone,
        "id": user.id
    }


def update_me(user, request):
    body = request.get_json()
    birth_date = body['birth_date']
    if birth_date is not None:
        birth_date = datetime.strptime(body['birth_date'], DATE_FORMAT_IN).date()

    database.edit_instance(Users, id=user.id,
                           birth_date=birth_date,
                           fiscal_code=body['fiscal_code'],
                           phone=body['phone'])


def parse_my_res(user):
    my_reservations = database.get_reservations_of(user.id)
    subscription_data = []
    for sub in my_reservations:
        subscription_data.append({
            "reservation_type": sub.reservation_type,
            "date": sub.date.strftime(DATE_FORMAT),
            "time": sub.time.strftime(TIME_FORMAT),
            "slot": sub.slot
        })
    return subscription_data


def users_all():
    db_users = database.get_all(Users)
    users = []
    for user in db_users:
        users.append({
            "name": user.name,
            "surname": user.surname,
            "role": user.role,
            "email": user.email,
            "birth_date": format_date(user.birth_date),
            "fiscal_code": user.fiscal_code
        })
    return users


def users_trainers_all():
    db_trainers = database.get_by_role(Users,'trainer')
    users = []
    for user in db_trainers:
        users.append({
            "name": user.name,
            "surname": user.surname,
            "role": user.role,
            "email": user.email,
            "birth_date": format_date(user.birth_date),
            "fiscal_code": user.fiscal_code,
            "id": user.id
        })
    return users


def courses_all():
    db_courses = database.get_all(Courses)
    courses = []
    for course in db_courses:
        courses.append({
            "id": course.id,
            "name": course.name,
            "description": course.description,
            "trainer": course.trainer
        })
    return courses

def current_policy():
    db_policies = database.get_current_policy()
    policies = []
    for policy in db_policies:
        policies.append({
            "id": policy.id,
            "description": policy.description,
            "valid_from": format_date(policy.valid_from),
            "valid_to":format_date(policy.valid_to)
        })
    return policies


def accesses_all(user):
    db_accesses = database.get_all_accesses(user.id)
    accesses = []
    for access in db_accesses:
        accesses.append({
            "id": access.id,
            "date": format_date(access.date),
            "time_entrance": format_time(access.time_entrance),
            "time_exit": format_time(access.time_exit)
        })
    return accesses
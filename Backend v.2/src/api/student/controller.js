import {success, notFound} from '../../services/response/'
import Student from './model'

export const index = (req, res, next) => {
    return Student.find()
        .then((student) => student.map((student) => student.view()))
        .then(success(res))
        .catch(next)

    Student.find()
}

export const show = (req, res, next) => {
    const id = req.params.id
    return Student.findById(id).exec()
        .then((student) => student ? student.view('full') : null)
        .then(success(res))
        .catch(notFound(res))
}

export const create = (req, res, next) => {
    const body = req.body
    Student.create(body)
        .then((student) => student.view('full'))
        .then(success(res))
        .catch(next)
}

export const update = (req, res, next) => {
    const id = req.params.id
    const body = req.body

    return Student.findById(id)
        .then(notFound(res))
        .then((student) => student ? Object.assign(student, body).save() : null)
        .then((student) => student ? student.view('full') : null)
        .then(success(res))
        .catch(next)
}

export const destroy = (req, res, next) => {
    const id = req.params.id
    return Student.findById(id)
        .then(notFound(res))
        .then((student) => student ? student.remove() : null)
        .then(success(res, 204))
        .catch(next)
};

export const searchByName = (req, res, next) => {
    const name = req.params.name

    Student.findOne({"name": {$regex: new RegExp(`${name}`, 'i')}},
        function (err, student) {
            if (!student)
                return notFound(res)(student);
            success(res)(student.view())
        })
};

export const searchByIndex = (req, res, next) => {
    const index = req.params.index

    Student.findOne({"index": {$regex: new RegExp(`${index}`, 'i')}},
        function (err, student) {
            if (!student)
                return notFound(res)(student);
            success(res)(student.view())
        })
};


export const searchByDebt = (req, res, next) => {
        Student.find({
            'debt': {$gte: 0},
        })
            .then((student) => student.map((student) => student.view('full')))
            .then(success(res))
            .catch(next)
    }
;

export const searchByBirthday = (req, res, next) => {
    const min = new Date(req.params.min);
    const max = new Date(req.params.max);

    Student.find({
        'birthday': {$lte: max, $gte: min},
    })
        .then((student) => student.map((student) => student.view('full')))
        .then(success(res))
        .catch(next)
};

export const count = (req, res, next) => {
    Student.count({})
        .then((count) => ({count: count}))
        .then(success(res))
        .catch(next)
}

export const listcount = (req, res, next) => {
    Promise.all([
        Student.find({})
            .then((student) => student.map((student) => student.view())),
        Student.count({})
    ]).then(([list, count]) => success(res)({list: list, count: count})).catch(next)
}

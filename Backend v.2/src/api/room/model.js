import mongoose, {Schema} from 'mongoose'
import {schema as Student} from '../student/model'

const roomSchema = new Schema({
    number: {
        type: Number,
        trim: true
    },
    students: {
        movies: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Student'
        }
    },

}, {
    timestamps: true,
})


roomSchema.methods = {
    view (type = 'full') {
        const full = {
            id: this.id,
            number: this.number,
            students: this.students,
        }

        const list = {
            id: this.id,
            number: this.number
        }

        switch (type) {
            case 'full':
                return full
            case 'list':
                return list
        }

        return full
    }
}


const model = mongoose.model('Room', roomSchema)

export default model.schema


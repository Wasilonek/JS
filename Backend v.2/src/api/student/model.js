import mongoose, {Schema} from 'mongoose'

const studentSchema = new Schema({
        name: {
            type: String,
            trim: true
        },
        index: {
            type: String,
            trim: true
        },
        birthday: {
            type: Date,
            trim: true
        },
        debt: {
            type: Number,
            trim: true
        },
        room: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Room'
        }
    }, {
        timestamps: true,
    }
)


studentSchema.methods = {
    view(type = 'list') {

        switch (type) {
            case 'list':
                return {
                    id: this.id,
                    name: this.name
                };
            default:
                return {
                    id: this.id,
                    index: this.index,
                    name: this.name,
                    birthday: this.birthday,
                    debt: this.debt
                }
        }
    }
}


const model = mongoose.model('Student', studentSchema)
export const schema = model.schema
export default model
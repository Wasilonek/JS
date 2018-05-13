import {Router} from 'express'
import {
    index,
    show,
    create,
    update,
    destroy,
    searchByName,
    searchByIndex,
    searchByDebt,
    searchByBirthday,
    count,
    listcount
} from './controller'


const router = new Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);


router.get('/search/name/:name', searchByName);
router.get('/search/debt/', searchByDebt);
router.get('/search/index/:index', searchByIndex);
router.get('/search/birthday/:min/:max', searchByBirthday);
router.get('/count', count);
router.get('/list', listcount);

export default router
import Router from 'router'
import AuthController from './controllers/AuthController.js'
import UserController from './controllers/UserController.js'

const router = Router()

router.post('/user/create', UserController.CREATE_USER)
router.post('/user/login', AuthController.LOGIN)

router.use(AuthController.CHECK_TOKEN)
router.post('/user/edit', UserController.EDIT_USER)
router.post('/user/delete', UserController.DELETE_USER)

export { router }

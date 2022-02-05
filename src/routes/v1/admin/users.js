import {Router} from "express";
import {getUsers, createUser, getUser, deleteUser, updateUser} from "../../../controllers/v1/admin/users.js";

const router = Router({mergeParams: true});

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;

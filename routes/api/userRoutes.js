const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getAllUsers).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
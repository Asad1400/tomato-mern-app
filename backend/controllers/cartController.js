import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById({_id: req.body.userId});
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate({_id: req.body.userId}, {cartData});
        res.json({
            success: true,
            message: "Item added to cart successfully"
        })
    }
    catch (e) {

    }
}

const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById({_id: req.body.userId});
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
            await userModel.findByIdAndUpdate({_id: req.body.userId}, {cartData});
            res.json({
                success: true,
                message: "Item removed from cart successfully"
            })
        }
    }
    catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
}

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById({_id: req.body.userId});
        let cartData = await userData.cartData;
        res.json({
            success: true,
            message: "Cart fetched successfully",
            data: cartData
        })
    }
    catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        })
    }
}

export { addToCart, removeFromCart, getCart }
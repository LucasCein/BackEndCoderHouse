import * as service from "../services/user.services.js";
export const createUser = async (req, res) => {
    try {
        const user = req.body;
        if(!user.email || !user.password || !user.first_name || !user.last_name || !user.age) throw new Error('Faltan campos obligatorios');
        const newUser = await service.createUser(user);
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const getRegister = async (req, res) => {
    try {
        res.render("register");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await service.loginUser(email, password);
        res.cookie("access_token", token, { httpOnly: true });
        res.redirect('/products')
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getLogin = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("access_token");
        res.redirect("/auth/login");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
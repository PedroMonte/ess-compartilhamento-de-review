const User = require("../models/User")

const getAll = async (req, res) => {
    const users = await User.find()

    if(users.length === 0){
        return res.status(404).json({ error: 'Ainda não há usuário cadastrados' })
    }

    res.json(users)
}

getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
    }
    else{
        res.json(user)
    }
}

// essa função aqui é temporária, apenas para jogar usuários no bd
const createUser = async (req, res) => {

    const newUser = new User(req.body)

    newUser.save()

    res.json(newUser)

}

const updateUser = async (req, res) => {
    let user = await User.findById(req.params.id, req.body);

    if(!user){
        return res.status(404).json({ error: 'Usuário não encontrado' })
    }
    else{
        // se achou o usuário
        //atualiza nome, bio, imagem e capa (se houver para troca)
        user = await User.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, bio: req.body.bio, profileImage:req.body.profileImage, coverImage:req.body.coverImage }, 
            { new: true }
        );
    }        

    // retorna os dados visíveis do usuário
    return res.json({
        name:user.name,
        bio:user.bio,
        profileImage:user.profileImage,
        coverImage:user.coverImage
    })
}

const deleteUser = async (req, res) =>{
    const deletedUser = await User.findByIdAndDelete(req.params.id)

    if(!deletedUser){
        return res.status(404).json({ error: 'Usuário não encontrado' })
    }
    else{
        res.json({
            name:deletedUser.name,
            bio:deletedUser.bio,
            profileImage:deletedUser.profileImage,
            coverImage:deletedUser.coverImage
        });
    }
}

const updatePassword = async (req, res) => {
    let user = await User.findById(req.params.id);

    if(user){
        //se a senha existir no body corretamente
        if(req.body.password && req.body.newPassword){

            //caso a senha seja diferente da atual
            if(user.password !== req.body.password){
                return res.status(400).json({ error: 'Senha atual incorreta.' });
            }

            //quando a tentativa de troca é para a mesma senha
            if(user.password === req.body.newPassword){
                return res.status(400).json({ error: 'A nova senha deve ser diferente da senha atual.' });
            }

            //regex para que a senha tenha requisitos mínimos
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{8,}$/;
            if (!passwordRegex.test(req.body.newPassword)) {
                return res.status(404).json({ error: 'A senha deve conter no mínimo 1 caracter maiúsculo, 1 caracter minúsculo, 1 simbolo especial e tamanho de pelo menos 8.' });
            }

            //atualiza a senha
            user = await User.findByIdAndUpdate(
                req.params.id,
                { password: req.body.newPassword },
                { new: true }
            );
            
                    res.json({
                        message: 'Senha alterada com sucesso!'
                    });
        }
    }
    else{
        return res.status(404).json({ error: 'Usuário não encontrado' })
    }
}

module.exports = {deleteUser, getAll, getUser, createUser, updateUser, updatePassword};
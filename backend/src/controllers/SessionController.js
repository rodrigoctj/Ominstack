//index(listar), show(consultar um), store(criar), update(atualizar), destory(apagar)
const User = require('../models/User');

module.exports = {
    async store(req, res){        
        const { email } = req.body; //const email = req.body.email; desestruturação

        let user = await User.findOne({ email });  //const eh para variaveis imutaveis, let eh para mutaveis

        if (!user){
            user = await User.create({ email });  
        }

        return res.json(user);
    }
};
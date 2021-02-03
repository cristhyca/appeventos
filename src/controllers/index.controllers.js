const indexcontrolador ={};
indexcontrolador.renderIndex = (req, res) =>{
res.render('index')
};
indexcontrolador.renderAbout = (req, res) =>{
    res.render('about')
    }
    module.exports = indexcontrolador;
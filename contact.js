const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

//membuat folder 
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

//membuat file JSON
const dataPath = './data/contacts.json'
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

const simpanContact = (nama, email, noHP) => {
        const contact = {nama,email,noHP};
    const contacts = loadContact();

        //cek duplikat
        const duplikat = contacts.find((contact) => contact.nama === nama);
        if(duplikat){
            console.log(chalk.yellow.inverse.bold('Contact sudah terdaftar, gunakan nama lain'));
            return false;
        }


        //cek email
        if(email){
            if(!validator.isEmail(email)){
                console.log(chalk.yellow.inverse.bold('Email salah'));
                return false;
            }
        }
        //cek noHP
        if(!validator.isMobilePhone(noHP, 'id-ID')){
            console.log(chalk.yellow.inverse.bold('No HP salah'));
            return false;
        }
        
        contacts.push(contact);
    
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    
        console.log(chalk.yellow.inverse.bold('Terima kasih sudah memasukkan data'));

     };

     const listContact = () => {
        const contacts = loadContact();
        console.log(chalk.yellow.bold('Daftar Kontak'));
        contacts.forEach((contact,i) => {
            console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
        });
     };

     const detailContact = (nama) => {
        const contacts = loadContact();
        const contact = contacts.find(
            (contact) => contact.nama.toLowerCase() === nama.toLowerCase());

        if(!contact){
            console.log(chalk.yellow(`${nama} tidak ada`));
            return false;
        }
        console.log(chalk.yellow(contact.nama));
        console.log(chalk.yellow(contact.noHP));
        if(contact.email){
        console.log(chalk.yellow(contact.email));
        };
     };

     const deleteContact = (nama) => {
        const contacts = loadContact();
        const newContacts = contacts.filter(
            (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()

        );
        if(contacts.length === newContacts.length){
            console.log(chalk.yellow(`${nama} tidak ada`));
            return false;
        }

        fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));

        console.log(chalk.yellow(`data ${nama} dihapus`));
        };

module.exports = {simpanContact, listContact, detailContact, deleteContact};
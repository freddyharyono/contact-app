const yargs = require('yargs');
const contacts = require('./contact');
yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string',
        },
        noHP: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    },
})

    .demandCommand();

    //menampilkan data
    yargs.command({
        command: 'list',
        describe: 'Menampilkan contact',
        handler() {
            contacts.listContact();
        }
    });

    //menampilkan detail
    yargs.command({
        command: 'detail',
        describe: 'Menampilkan detail',
        builder:{
          nama:{
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
          },  
        },
        handler(argv) {
            contacts.detailContact(argv.nama);
        }
    });

    //menghapus data
    yargs.command({
        command: 'delete',
        describe: 'Menghapus data',
        builder:{
          nama:{
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
          },  
        },
        handler(argv) {
            contacts.deleteContact(argv.nama);
        }
    });

yargs.parse();













// const {tulisPertanyaan, simpanContact} = require('./contact');

// const main = async () => {
//     const nama =await tulisPertanyaan('Masukkan nama anda :');
//     const email =await tulisPertanyaan('Masukkan email anda :');
//     const noHP =await tulisPertanyaan('Masukkan noHP anda :');
    
//     simpanContact(nama, email, noHP);

// };

//  main();

import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';

// definir a rede
const network = bitcoin.networks.testnet;

// derivação de carteiras HD (BIP49)
const path = `m/49'/1'/0'/0`; 

// criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// criando a raiz da cartiera HD
let root = bip32.fromSeed(seed, network);

// criando uma conta - par de chaves pvt-pub
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

// criando um endereço compatível com BIP49 (P2WPKH em P2SH)
let btcAddress = bitcoin.payments.p2sh({
  redeem: bitcoin.payments.p2wpkh({
    pubkey: node.publicKey,
    network: network,
  }),
  network: network,
}).address;

console.log("Carteira gerada");
console.log("Endereço: ", btcAddress);
console.log("Chave privada:", node.toWIF());
console.log("Seed:", mnemonic);
import { Keypair } from '@solana/web3.js';
import * as fs from 'fs';

const keypair = Keypair.generate();
const secretKey = JSON.stringify(Array.from(keypair.secretKey));

fs.writeFileSync('wallet.json', secretKey);

console.log('Wallet created and saved to wallet.json');
console.log('Public Key:', keypair.publicKey.toBase58());

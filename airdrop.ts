import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import * as fs from 'fs';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const secretKeyString = fs.readFileSync('wallet.json', 'utf8');
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const wallet = Keypair.fromSecretKey(secretKey);

(async () => {
    const airdropSignature = await connection.requestAirdrop(wallet.publicKey, 2e9);
    await connection.confirmTransaction(airdropSignature);
    console.log('Airdrop successful');
})();

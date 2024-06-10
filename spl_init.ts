import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import { createMint } from '@solana/spl-token';
import * as fs from 'fs';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const secretKeyString = fs.readFileSync('wallet.json', 'utf8');
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const wallet = Keypair.fromSecretKey(secretKey);

(async () => {
    const mint = await createMint(
        connection,
        wallet,
        wallet.publicKey,
        null,
        9
    );
    console.log('Mint created:', mint.toBase58());
})();

import { Connection, clusterApiUrl, Keypair, PublicKey } from '@solana/web3.js';
import { createAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import * as fs from 'fs';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const secretKeyString = fs.readFileSync('wallet.json', 'utf8');
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const wallet = Keypair.fromSecretKey(secretKey);

const mintPublicKey = new PublicKey('BtJXE5M7eaRjiRnm8AkRDY9c7CrAp9Bjhhp6PyVHwX9V');

(async () => {
    const tokenAccount = await createAssociatedTokenAccount(
        connection,
        wallet,
        mintPublicKey,
        wallet.publicKey
    );

    await mintTo(
        connection,
        wallet,
        mintPublicKey,
        tokenAccount,
        wallet.publicKey,
        1000000000 // 1000 tokens with 9 decimals
    );

    console.log('Tokens minted to:', tokenAccount.toBase58());
})();

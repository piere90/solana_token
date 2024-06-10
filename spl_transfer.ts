import { Connection, clusterApiUrl, Keypair, PublicKey } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';
import * as fs from 'fs';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const secretKeyString = fs.readFileSync('wallet.json', 'utf8');
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const wallet = Keypair.fromSecretKey(secretKey);

const mintPublicKey = new PublicKey('BtJXE5M7eaRjiRnm8AkRDY9c7CrAp9Bjhhp6PyVHwX9V');
const recipientPublicKey = new PublicKey('2B3L5BZ7cvSamrHmgSQHPR5Z4zZr4Ret3Jnz2QkrhaLg');

(async () => {
    const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet,
        mintPublicKey,
        wallet.publicKey
    );

    const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet,
        mintPublicKey,
        recipientPublicKey
    );

    await transfer(
        connection,
        wallet,
        senderTokenAccount.address,
        recipientTokenAccount.address,
        wallet.publicKey,
        500000000 // 500 tokens with 9 decimals
    );

    console.log('Tokens transferred to:', recipientTokenAccount.address.toBase58());
})();

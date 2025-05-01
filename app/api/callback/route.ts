import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
        console.error("No code received in the callback URL.");
        return NextResponse.json({ error: 'No authorization code provided' }, { status: 400 });
    }

    console.log("Received code:", code);

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: process.env.REDIRECT_URI,
        }),
    });

    const tokenData = await tokenRes.json();
    console.log('Token response:', tokenData);

    if (tokenData.error) {
        console.error("Failed to get access token:", tokenData);
        return NextResponse.json({ error: `Failed to get access token: ${tokenData.error_description || 'Unknown error'}` }, { status: 500 });
    }

    const accessToken = tokenData.access_token;
    console.log('Access token:', accessToken);

    const userRes = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const userData = await userRes.json();
    console.log('User data:', userData);

    if (userData.message === 'Not Found') {
        console.error("User data not found:", userData);
        return NextResponse.json({ error: 'User data not found' }, { status: 404 });
    }

    const redirectUrl = `https://mp-6-tau.vercel.app/user?name=${userData.name}&avatar_url=${userData.avatar_url}&login=${userData.login}`;
    return NextResponse.redirect(redirectUrl);
}
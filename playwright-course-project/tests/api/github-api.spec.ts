import { test, expect, request } from '@playwright/test';

test('GitHub API: Validate Octocat user data', async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.get('https://api.github.com/users/octocat');

    // Check that the request was successful
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Check response headers
    expect(response.headers()['content-type']).toContain('application/json');

    // Parse response body
    const data = await response.json();

    // Validate core user data
    expect(data.login).toBe('octocat');
    expect(data.type).toBe('User');
    expect(data.id).toBeGreaterThan(0);
    expect(data.public_repos).toBeGreaterThan(5);
    expect(new Date(data.created_at).getFullYear()).toBeLessThanOrEqual(new Date().getFullYear());

    // Log key values
    console.log('User login:', data.login);
    console.log('Public repositories:', data.public_repos);
    console.log('Account created at:', data.created_at);
});

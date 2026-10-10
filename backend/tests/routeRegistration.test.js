// Regression for #2342: duplicate/misplaced route registrations and the
// rate-limit bypass on /api/google-calendar + /api/roadmaps.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../server.js', import.meta.url), 'utf8');
const listenLine = source.indexOf('app.listen(');

// Every app.use registration for these routes, with its position and whether
// generalLimiter is attached.
function registrations(route) {
    const out = [];
    let idx = 0;
    while (true) {
        const at = source.indexOf(`"${route}"`, idx);
        if (at === -1) break;
        // look backwards to the enclosing app.use(
        const useAt = source.lastIndexOf('app.use(', at);
        // The limiter may follow the route string in multiline form —
        // inspect the whole app.use(...) statement (up to its closing ');').
        const stmtEnd = source.indexOf(');', at);
        const limiterBetween = source.slice(useAt, stmtEnd).includes('generalLimiter');
        out.push({ afterListen: useAt > listenLine, hasLimiter: limiterBetween });
        idx = at + 1;
    }
    return out;
}

describe('route registration hygiene (#2342)', () => {
    for (const route of ['/api/books', '/api/jobs', '/api/courses', '/api/google-calendar']) {
        it(`${route} is registered exactly once, before app.listen, with the limiter`, () => {
            const regs = registrations(route);
            expect(regs.length).toBe(1);
            expect(regs[0].afterListen).toBe(false);
            expect(regs[0].hasLimiter).toBe(true);
        });
    }

    it('/api/roadmaps carries the general limiter', () => {
        const regs = registrations('/api/roadmaps');
        expect(regs.length).toBe(1);
        expect(regs[0].hasLimiter).toBe(true);
    });
});

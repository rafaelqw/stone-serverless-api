import { handle as getAccesses } from './getAccesses';
import { handle as registerAccess } from './registerAccess';

describe("Validate CountAPI", () => {
  it(" should be able to validate integration with CountAPI", async () => {
    const beforeAccess = await getAccesses();
    await registerAccess();
    const afterAccess = await getAccesses();

    const bodyBeforeAccess = JSON.parse(beforeAccess.body);
    const bodyAfterAccess = JSON.parse(afterAccess.body);

    expect(bodyAfterAccess.accesses).toBe(bodyBeforeAccess.accesses + 1);
  });
});
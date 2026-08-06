import { describe, it, expect } from "vitest";
import { parseEventsFromMarkdown } from "./parseOpenSourceEvents";

describe("parseEventsFromMarkdown", () => {
  it("parses HTML/details month headings used by the upstream README", () => {
    const markdown = `
<details>
 <summary><h2> January :sparkles: </h2></summary>

- [FOSDEM 26](https://fosdem.org/2026)
  > Date: 31st January - 1st February || Mode: In-person || Location: Brussels, Belgium.

</details>

<details>
 <summary><h2> February :sparkles: </h2></summary>

- [DevConf.IN](https://www.devconf.info/in/)
  > Date: 13th - 14th February || Mode: In-person || Location: Pune, India.

</details>
`;

    const events = parseEventsFromMarkdown(markdown);

    expect(events).toHaveLength(2);
    expect(events[0]).toMatchObject({
      name: "FOSDEM 26",
      month: "January",
      mode: "In-person",
      location: "Brussels, Belgium.",
    });
    expect(events[1]).toMatchObject({
      name: "DevConf.IN",
      month: "February",
      location: "Pune, India.",
    });
  });

  it("still supports classic markdown month headings", () => {
    const markdown = `
## March

- [Laracon EU](https://laracon.eu/)
  > Date: 2nd - 3rd March || Mode: In-person || Location: Amsterdam, Netherlands.

## April

- [PyCon US](https://us.pycon.org/)
  > Date: 15th April || Mode: Hybrid || Location: Pittsburgh, USA.
`;

    const events = parseEventsFromMarkdown(markdown);

    expect(events.map((e) => e.month)).toEqual(["March", "April"]);
    expect(events[0].name).toBe("Laracon EU");
    expect(events[1].mode).toBe("Hybrid");
  });

  it("keeps TBA only when no recognised month section precedes an event", () => {
    const markdown = `
<summary><h2> Subscribe to the Calendar </h2></summary>

- [Orphan Event](https://example.com)
  > Date: TBD || Mode: Virtual || Location: Global

## May

- [Known Event](https://example.com/may)
  > Date: 1st May || Mode: In-person || Location: Berlin
`;

    const events = parseEventsFromMarkdown(markdown);

    expect(events).toHaveLength(2);
    expect(events[0]).toMatchObject({ name: "Orphan Event", month: "TBA" });
    expect(events[1]).toMatchObject({ name: "Known Event", month: "May" });
  });

  it("ignores malformed sections and preserves event order within a month", () => {
    const markdown = `
<details>
 <summary><h2> June :sparkles: </h2></summary>

- [Zebra Conf](https://example.com/z)
  > Date: 20th June || Mode: Virtual || Location: Online

not a real event line
- [Alpha Conf](https://example.com/a)
  > Date: 5th June || Mode: In-person || Locations: Austin, USA

</details>
`;

    const events = parseEventsFromMarkdown(markdown);

    expect(events).toHaveLength(2);
    expect(events.map((e) => e.name)).toEqual(["Zebra Conf", "Alpha Conf"]);
    expect(events.every((e) => e.month === "June")).toBe(true);
    expect(events[1].location).toBe("Austin, USA");
  });
});

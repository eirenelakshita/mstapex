import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree"
import { WeatherListItem } from "./WeatherList"
import { reaction } from "mobx"

it("can create a instance of a model", () => {
    const item = WeatherListItem.create({
        data: [11.59, 10.61, 9.47, 8.84, 8.89, 10.12, 11.41, 12.61, 12.49, 10.85, 9.68, 9.6, 10.05, 11.32, 12.98, 12.63, 10.78, 9.91, 9.28, 8.87, 9.28, 11.07, 12.87, 13.46, 13.36, 13.73, 13.9, 14.35, 14.39, 14.33, 14.98, 15.28, 14.73, 14.95, 14.55, 14.82, 14.85, 15, 15.84, 15.98],
        name: "London,UK"
    })

    expect(item.average).toBe(12.3425)
})
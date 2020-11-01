import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree"
import { WeatherListItem } from "./WeatherList"
import { reaction } from "mobx"

it("can create a instance of a model", () => {
    const item = WeatherListItem.create({
        "name": "Chronicles of Narnia Box Set - C.S. Lewis",
        "price": 28.73,
        "image": "https://richmedia.ca-richimage.com/ImageDelivery/imageService?profileId=12026540&id=1119288&recipeId=728"
    })

    expect(item.price).toBe(28.73)
    item.changeName("Narnia")
    expect(item.name).toBe("Narnia")
})
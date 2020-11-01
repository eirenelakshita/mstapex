import { types, getParent,destroy } from "mobx-state-tree";

export const WeatherListItem = types
    .model({
    name: types.string,
    price: types.number,
    image: ""
    })
    .actions(self => ({
        changeName(newName) {
            self.name = newName
        },
        changePrice(newPrice) {
            self.price = newPrice
        },
        changeImage(newImage) {
            self.image = newImage
        }
    }))
import { types, getParent, destroy, flow } from "mobx-state-tree";
import { onSnapshot, getSnapshot } from "mobx-state-tree";
import API from "../utils/API.js";

export const RenderList = types
    .model({
    })

export const WeatherListItem = types
    .model({
        name: types.string,
        data: types.array(types.number)
    })
    .actions(self => ({
        changeName(newName) {
            self.name = newName
        },
        changeData(newData) {
            self.data = newData
        },
        remove() {
            getParent(self,2).remove(self)
        }
    }))
    .views(self=> ({
        get average() {
            return self.data.reduce((sum,entry)=>sum+entry,0)/self.data.length
        }
    }))

export const WeatherList = types
    .model({
    items: types.optional(types.array(WeatherListItem), [])
    })
    .actions(self => ({
        add(item) {
            self.items.push(item)
        },
        remove(item) {
            destroy(item)
        },
        async update(option) {
            let arr2 = []
            const res = await API.search(option)
            await res.data.list.map(d => arr2.push(d.main.temp))
            this.updateTwo(option,arr2)
        },
        updateTwo(option,arr2) {
            const target = self.items.find(o => o.name === option)
            target.changeData(arr2)
            console.log(JSON.stringify(self.items[0]))
        },
        selected(selectedOption) {
            let renderList = []
            selectedOption.map(option => renderList.push(WeatherListItem.create(getSnapshot(self).items.find(item => item.name === option.value))))
            return renderList
        }
    }))
    .views(self=> ({
        get average() {
            let arrays = [self.items[0].data, self.items[1].data, self.items[2].data, self.items[3].data]
            let result = []

            for(var i = 0; i < arrays[0].length; i++){
              var num = 0;
              for(var i2 = 0; i2 < arrays.length; i2++){
                num += arrays[i2][i];
              }
              result.push(Math.round(num / arrays.length));
            }

            return result
        },
        get ranking() {
            let array = self.items.map(item => [item.name,item.average])
            array.sort(function(a, b){return a[1]-b[1]})
            return array
        }
    }))
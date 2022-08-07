import {create} from "react-test-renderer";
import React from "react";
import Paginator from "./Paginator";

describe('Paginator component tests', () => {
    test("pages count is 11 but should be shown only 10", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>)
        const root = component.root
        // eslint-disable-next-line testing-library/await-async-query
        let spans = root.findAllByType('span')
        expect(spans.length).toBe(10)
    })
    test("if pages count is more then 10 button Next should be shown", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>)
        const root = component.root
        // eslint-disable-next-line testing-library/await-async-query
        let button = root.findAllByType('button')
        expect(button.length).toBe(1)
    })
})
/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import "@blueprintjs/test-commons/bootstrap";

import { add } from "date-fns";

import { generateIsomorphicTests } from "@blueprintjs/test-commons";

import DateTime from "../lib/cjs/index.js";

describe("@blueprintjs/datetime isomorphic rendering", () => {
    const formatProps = {
        formatDate: date => date.toLocaleString(),
        parseDate: str => new Date(Date.parse(str)),
        placeholder: "enter date",
    };

    const today = new Date();
    const maxDate = add(today, { days: 1 });
    const minDate = add(today, { years: -4 });

    generateIsomorphicTests(
        DateTime,
        {
            DateInput: { props: formatProps },
            DateRangeInput: { props: formatProps },
            DatePickerShortcutMenu: {
                className: false,
                props: {
                    allowSingleDayRange: true,
                    maxDate,
                    minDate,
                    onShortcutClick: () => {
                        /* no-op */
                    },
                    shortcuts: true,
                    timePrecision: "second",
                },
            },
        },
        {
            excludedSymbols: ["DateRangeSelectionStrategy", "MonthAndYear"],
        },
    );
});

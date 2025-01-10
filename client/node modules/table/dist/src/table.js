"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table = void 0;
const alignTableData_1 = require("./alignTableData");
const calculateOutputColumnWidths_1 = require("./calculateOutputColumnWidths");
const calculateRowHeights_1 = require("./calculateRowHeights");
const drawTable_1 = require("./drawTable");
const injectHeaderConfig_1 = require("./injectHeaderConfig");
const makeTableConfig_1 = require("./makeTableConfig");
const mapDataUsingRowHeights_1 = require("./mapDataUsingRowHeights");
const padTableData_1 = require("./padTableData");
const stringifyTableData_1 = require("./stringifyTableData");
const truncateTableData_1 = require("./truncateTableData");
const utils_1 = require("./utils");
const validateTableData_1 = require("./validateTableData");
const table = (data, userConfig = {}) => {
    (0, validateTableData_1.validateTableData)(data);
    let rows = (0, stringifyTableData_1.stringifyTableData)(data);
    const [injectedRows, injectedSpanningCellConfig] = (0, injectHeaderConfig_1.injectHeaderConfig)(rows, userConfig);
    const config = (0, makeTableConfig_1.makeTableConfig)(injectedRows, userConfig, injectedSpanningCellConfig);
    rows = (0, truncateTableData_1.truncateTableData)(injectedRows, (0, utils_1.extractTruncates)(config));
    const rowHeights = (0, calculateRowHeights_1.calculateRowHeights)(rows, config);
    config.spanningCellManager.setRowHeights(rowHeights);
    config.spanningCellManager.setRowIndexMapping(rowHeights);
    rows = (0, mapDataUsingRowHeights_1.mapDataUsingRowHeights)(rows, rowHeights, config);
    rows = (0, alignTableData_1.alignTableData)(rows, config);
    rows = (0, padTableData_1.padTableData)(rows, config);
    const outputColumnWidths = (0, calculateOutputColumnWidths_1.calculateOutputColumnWidths)(config);
    return (0, drawTable_1.drawTable)(rows, outputColumnWidths, rowHeights, config);
};
exports.table = table;
//# sourceMappingURL=table.js.map
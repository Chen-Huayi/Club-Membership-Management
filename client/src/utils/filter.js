import {Button, Input, Space} from "antd"
import {SearchOutlined} from "@ant-design/icons"


const handleSearch = (selectedKeys, confirm) => {
    confirm()
}

const handleReset = (clearFilters) => {
    clearFilters()
}

const getFilterProps = (dataIndex, searchInput) => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
        <div style={{padding: 8}}>
            <Input
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                style={{
                    marginBottom: 8,
                    display: 'block',
                }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined/>}
                    size="small"
                    style={{width: 90}}
                >
                    Search
                </Button>
                <Button
                    onClick={() => {
                        clearFilters && handleReset(clearFilters)
                        confirm({closeDropdown: false})
                    }}
                    size="small"
                    style={{width: 90}}
                >
                    Reset
                </Button>
                <Button type="link" size="small" onClick={() => close()}>
                    Close
                </Button>
            </Space>
        </div>
    ),
    filterIcon: (filtered) => (
        <SearchOutlined
            style={{
                color: filtered ? '#1890ff' : undefined,
            }}
        />
    ),
    onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
        if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
        }
    },
})

export {getFilterProps}

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MailIcon from '@mui/icons-material/Mail';
import MobileIcon from '@mui/icons-material/MobileFriendly';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { forwardRef } from 'react';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { useNestedCollectionsQuery } from '@/hooks/queries';
import { AthleteMembershipType, FirebaseAthlete } from '@/models';

interface Data {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly phoneNumber: number;
    readonly dateOfBirth: string;
    readonly emergencyName: string;
    readonly emergencyNumber: number;
    readonly membershipType: AthleteMembershipType;
}

interface ColumnData {
    dataKey: keyof Data;
    label: string;
    numeric?: boolean;
    width: number;
    icon?: React.ReactNode;
}

const columns: ColumnData[] = [
    {
        width: 250,
        label: 'Name',
        dataKey: 'name',
        icon: <PersonIcon />
    },
    {
        width: 250,
        label: 'Email',
        dataKey: 'email',
        icon: <MailIcon />
    },
    {
        width: 170,
        label: 'Phone Number',
        dataKey: 'phoneNumber',
        numeric: true,
        icon: <MobileIcon />
    },
    {
        width: 150,
        label: 'Date of Birth',
        dataKey: 'dateOfBirth',
        icon: <CalendarMonthIcon />
    },
    {
        width: 160,
        label: 'Membership',
        dataKey: 'membershipType',
        icon: <PersonIcon />
    },
    {
        width: 260,
        label: 'Emergency Contact',
        dataKey: 'emergencyName',
        icon: <PersonIcon />
    },
    {
        width: 205,
        label: 'Emergency Number',
        dataKey: 'emergencyNumber',
        numeric: true,
        icon: <MobileIcon />
    }
];

const VirtuosoTableComponents: TableComponents<Data> = {
    Scroller: forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: props => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref} />
    ))
};

function fixedHeaderContent() {
    return (
        <TableRow>
            {columns.map(column => (
                <TableCell
                    key={column.dataKey}
                    variant="head"
                    align="left"
                    style={{ width: column.width, justifyContent: 'center' }}
                >
                    <div className="table-heading">
                        <span>{column.label}</span> {column.icon}
                    </div>
                </TableCell>
            ))}
        </TableRow>
    );
}

function rowContent(_index: number, row: Data) {
    return (
        <>
            {columns.map(column => (
                <TableCell key={column.dataKey} align={column.numeric || false ? 'left' : 'left'}>
                    {row[column.dataKey]}
                </TableCell>
            ))}
        </>
    );
}

export default function VirtualizedTable() {
    const { data } = useNestedCollectionsQuery<FirebaseAthlete>('athletes');
    const dataRows = data as Data[];
    const rows = dataRows?.sort(sortNames);

    return (
        <>
            {rows?.length ? (
                <Paper elevation={0} style={{ height: rows.length * 53.01 + 57, width: '100%' }}>
                    <TableVirtuoso
                        data={rows}
                        components={VirtuosoTableComponents}
                        fixedHeaderContent={fixedHeaderContent}
                        itemContent={rowContent}
                    />
                </Paper>
            ) : (
                <p>No registered athletes. Get your rowers onboard!</p>
            )}
        </>
    );
}

function sortNames(firstPerson: Data, secondPerson: Data) {
    if (firstPerson.name < secondPerson.name) return -1;
    if (firstPerson.name > secondPerson.name) return 1;
    return 0;
}

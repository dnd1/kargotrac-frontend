
import React from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

interface Suggestion {
    label: string;
}

const suggestions: Suggestion[] = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
];

type RenderInputProps = TextFieldProps & {
    classes: ReturnType<typeof useStyles>;
    ref?: React.Ref<HTMLDivElement>;
};

function renderInput(inputProps: RenderInputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

interface RenderSuggestionProps {
    highlightedIndex: number | null;
    index: number;
    itemProps: MenuItemProps<'div', { button?: never }>;
    selectedItem: Suggestion['label'];
    suggestion: Suggestion;
}

function renderSuggestion(suggestionProps: RenderSuggestionProps) {
    const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}

function getSuggestions(suggestions: any,value: string, { showEmpty = false } = {}) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0 && !showEmpty
        ? []
        : suggestions.filter((suggestion : any) => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            height: 250,
        },
        container: {
            flexGrow: 1,
            position: 'relative',
        },
        paper: {
            position: 'absolute',
            zIndex: 1,
            marginTop: theme.spacing(1),
            left: 0,
            right: 0,
        },
        chip: {
            margin: theme.spacing(0.5, 0.25),
        },
        inputRoot: {
            flexWrap: 'wrap',
        },
        inputInput: {
            width: 'auto',
            flexGrow: 1,
        },
        divider: {
            height: theme.spacing(2),
        },
    }),
);

let popperNode: HTMLDivElement | null | undefined;

export default function IntegrationDownshift(props : any) {
    const classes = useStyles();

    const options : Suggestion[] = props.suggestions.map((suggestion : any) => {
        return { label: suggestion.tracking_id}
    })

    return (
        <div className={classes.root}>
            <Downshift id="downshift-simple" >
                {({
                    getInputProps,
                    getItemProps,
                    getLabelProps,
                    getMenuProps,
                    highlightedIndex,
                    inputValue,
                    isOpen,
                    selectedItem,
                }) => {
                    const { onBlur, onFocus, ...inputProps } = getInputProps({
                        placeholder: 'Search ...',
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                            console.log("Este es el selected item")
                            console.log(selectedItem)
                            if(selectedItem) props.handleChangeSelect(selectedItem)
                            else props.handleChange(e)
                            
                            if (!e.target.value) {
                                //clearSelection();
                                // onchange que tengo 
                                console.log("change")
                            }
                        },
                        // allowing user input.
                        onBlur: (e: React.ChangeEvent<HTMLInputElement>) => {
                            let label = e.target.value;
                            console.log("NAMEEEEEE")
                            console.log(e.target.value)
                            if (selectedItem) {
                                props.handleChange(e)
                                if (selectedItem.label === label) {
                                    
                                    return;
                                }
                            }else selectedItem = props.tracking_value
                            console.log(selectedItem)
                            
                        },
                        name: "tracking_id",
                        value: selectedItem || props.tracking_value
                    })

                    return (
                        <div className={classes.container}>
                            {renderInput({
                                fullWidth: true,
                                classes,
                                label: '# Paquete',
                                InputLabelProps: getLabelProps({ shrink: true } as any),
                                InputProps: { onBlur, onFocus },
                                inputProps,
                            })}
                            <div {...getMenuProps()}>
                                {isOpen ? (
                                    <Paper className={classes.paper} square>
                                        {getSuggestions(options, inputValue!).map((suggestion:any, index:number) =>
                                            renderSuggestion({
                                                suggestion,
                                                index,
                                                itemProps: getItemProps({ item: suggestion.label }),
                                                highlightedIndex,
                                                selectedItem,
                                            }),
                                        )}
                                    </Paper>
                                ) : null}
                            </div>
                        </div>
                    );
                }}
            </Downshift>
        </div>
    );
}
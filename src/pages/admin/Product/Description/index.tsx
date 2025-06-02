import React, { useState, useRef } from 'react';
import {
    Box,
    TextField,
    Tabs,
    Tab,
    IconButton,
    Tooltip,
    Typography,
    Menu,
    MenuItem,
} from '@mui/material';
import {
    FormatBold,
    FormatItalic,
    Link,
    FormatListBulleted,
    Title,
    Code,
} from '@mui/icons-material';
import MuiMarkdown from 'mui-markdown';

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
    const [mode, setMode] = useState<'edit' | 'preview'>('edit');
    const textFieldRef = useRef<HTMLTextAreaElement>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleTabChange = (event: React.SyntheticEvent, newValue: 'edit' | 'preview') => {
        setMode(newValue);
    };

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        console.log('Heading menu opened');
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const insertMarkdown = (
        before: string,
        after: string = '',
        defaultText: string = 'text',
        isList: boolean = false
    ) => {
        const input = textFieldRef.current;
        if (!input) {
            console.error('TextField input not found');
            return;
        }

        const start = input.selectionStart || 0;
        const end = input.selectionEnd || 0;
        let selectedText = value.slice(start, end) || defaultText;

        let newValue: string;
        if (isList && selectedText.includes('\n')) {
            // Xử lý danh sách nhiều dòng
            const lines = selectedText.split('\n').filter((line) => line.trim());
            selectedText = lines.map((line) => `- ${line.trim()}`).join('\n');
            newValue = value.slice(0, start) + selectedText + value.slice(end);
        } else {
            newValue =
                value.slice(0, start) +
                before +
                selectedText +
                after +
                value.slice(end);
        }

        console.log('Inserting Markdown:', { before, selectedText, after, start, end, isList });

        onChange(newValue);

        // Đặt lại vị trí con trỏ
        const newCursorStart = start + (isList ? 2 : before.length);
        const newCursorEnd = newCursorStart + selectedText.length;
        setTimeout(() => {
            input.selectionStart = newCursorStart;
            input.selectionEnd = newCursorEnd;
            input.focus();
        }, 0);
    };

    const handleInsertBold = () => {
        console.log('Bold button clicked');
        insertMarkdown('**', '**', 'đậm');
    };
    const handleInsertItalic = () => {
        console.log('Italic button clicked');
        insertMarkdown('*', '*', 'nghiêng');
    };
    const handleInsertLink = () => {
        console.log('Link button clicked');
        insertMarkdown('[', '](https://example.com)', 'liên kết');
    };
    const handleInsertList = () => {
        console.log('List button clicked');
        insertMarkdown('- ', '', 'mục', true);
    };
    const handleInsertHeading = (level: number) => {
        console.log(`Heading ${level} selected`);
        const prefix = '#'.repeat(level) + ' ';
        insertMarkdown(prefix, '', 'Tiêu đề');
        handleCloseMenu();
    };
    const handleInsertCode = () => {
        console.log('Code button clicked');
        insertMarkdown('```', '```', '\ncode\n');
    };

    return (
        <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2, mt: 2 }}>
            <Tabs value={mode} onChange={handleTabChange} sx={{ mb: 2 }}>
                <Tab label="Chỉnh sửa" value="edit" />
                <Tab label="Xem trước" value="preview" />
            </Tabs>
            {mode === 'edit' ? (
                <Box>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        <Tooltip title="Định dạng đậm">
                            <IconButton onClick={handleInsertBold} size="small">
                                <FormatBold />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Định dạng nghiêng">
                            <IconButton onClick={handleInsertItalic} size="small">
                                <FormatItalic />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Chèn liên kết">
                            <IconButton onClick={handleInsertLink} size="small">
                                <Link />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Danh sách bullet">
                            <IconButton onClick={handleInsertList} size="small">
                                <FormatListBulleted />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Chọn tiêu đề (H1-H6)">
                            <IconButton onClick={handleOpenMenu} size="small">
                                <Title />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseMenu}
                            MenuListProps={{
                                'aria-labelledby': 'heading-button',
                            }}
                        >
                            {[1, 2, 3, 4, 5, 6].map((level) => (
                                <MenuItem
                                    key={level}
                                    onClick={() => handleInsertHeading(level)}
                                >
                                    Tiêu đề H{level}
                                </MenuItem>
                            ))}
                        </Menu>
                        <Tooltip title="Code block">
                            <IconButton onClick={handleInsertCode} size="small">
                                <Code />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <TextField
                        inputRef={textFieldRef}
                        fullWidth
                        label="Mô tả (Markdown)"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        multiline
                        rows={15}
                        variant="outlined"
                        placeholder="Nhập nội dung Markdown (ví dụ: **Đậm**, *Nghiêng*, [Link](https://example.com))"
                    />
                </Box>
            ) : (
                <Box
                    sx={{
                        p: 2,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        minHeight: '150px',
                        bgcolor: 'background.paper',
                        '& strong': { fontWeight: 'bold' },
                        '& em': { fontStyle: 'italic' },
                        '& a': { color: 'primary.main', textDecoration: 'underline' },
                        '& ul': { pl: 4 },
                        '& pre': { bgcolor: 'grey.100', p: 2, borderRadius: 1 },
                        '& h1, & h2, & h3, & h4, & h5, & h6': { fontWeight: 'bold', mt: 2, mb: 1 },
                    }}
                >
                    {value ? (
                        <MuiMarkdown>{value}</MuiMarkdown>
                    ) : (
                        <Typography color="text.secondary">
                            *Không có nội dung để hiển thị*
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default MarkdownEditor;
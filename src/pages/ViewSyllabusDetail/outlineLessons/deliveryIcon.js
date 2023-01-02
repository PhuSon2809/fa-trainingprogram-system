import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import SpellcheckOutlinedIcon from '@mui/icons-material/SpellcheckOutlined';
import SettingsInputAntennaOutlinedIcon from '@mui/icons-material/SettingsInputAntennaOutlined';
import SnippetFolderOutlinedIcon from '@mui/icons-material/SnippetFolderOutlined';


export const deliveryTypes = [
  { name: "Assignment/Lab", icon: <ClassOutlinedIcon className='delivery-icon' fontSize='medium' /> },
  { name: "Concept/Lecture", icon: <RecordVoiceOverOutlinedIcon className='delivery-icon' fontSize='medium'/> },
  { name: "Guide/Review", icon: <PanToolOutlinedIcon className='delivery-icon' fontSize='medium'/>},
  { name: "Test/Quiz", icon: <FactCheckOutlinedIcon className='delivery-icon' fontSize='medium'/>},
  { name: "Exam", icon: <SpellcheckOutlinedIcon className='delivery-icon' fontSize='medium'/>},
  {name: "Seminar/Workshop", icon: <SettingsInputAntennaOutlinedIcon className='delivery-icon' fontSize='medium'/>}
];

export {SnippetFolderOutlinedIcon};
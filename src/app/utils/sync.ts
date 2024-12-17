/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const exportData = (data: any): void => {
    const fileName = `taskmaster_backup_${new Date().toISOString().split('T')[0]}.json`;
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };
  
  export const importData = async (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          resolve(data);
        } catch (error) {
          reject(new Error('Invalid backup file'));
        }
      };
      reader.readAsText(file);
    });
  };
  
  export const generateSyncCode = (data: any): string => {
    const compressed = btoa(JSON.stringify(data));
    return compressed;
  };
  
  export const decodeSyncCode = (code: string): any => {
    try {
      const decoded = JSON.parse(atob(code));
      return decoded;
    } catch (error) {
      throw new Error('Invalid sync code');
    }
  };
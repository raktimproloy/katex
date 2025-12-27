import React from 'react';
import { ActivityIndicator, StyleSheet, View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const MathView = ({ math, displayMode = false, style }) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="file:///android_asset/katex.min.css">
    <style>
        body {
            margin: 0;
            padding: 16px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: transparent;
            overflow: hidden;
        }
        .math-container {
            font-size: 18px;
            ${displayMode ? 'text-align: center;' : ''}
            display: flex;
            align-items: center;
            justify-content: ${displayMode ? 'center' : 'flex-start'};
            min-height: 40px;
        }
        .katex-display {
            margin: 0;
        }
        .error {
            color: #cc0000;
            font-family: monospace;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="math-container" id="math">Loading...</div>
    <script src="file:///android_asset/katex.min.js"></script>
    <script>
        window.onerror = function(msg, url, lineNo, columnNo, error) {
            document.getElementById('math').innerHTML = '<div class="error">Error: ' + msg + '</div>';
            return false;
        };
        
        function renderMath() {
            try {
                if (typeof katex === 'undefined') {
                    setTimeout(renderMath, 50);
                    return;
                }
                
                katex.render(${JSON.stringify(math)}, document.getElementById('math'), {
                    displayMode: ${displayMode},
                    throwOnError: false,
                    errorColor: '#cc0000',
                    trust: false,
                    strict: false
                });
                
                // Send message to React Native that rendering is complete
                if (window.ReactNativeWebView) {
                    window.ReactNativeWebView.postMessage('rendered');
                }
                
            } catch (error) {
                document.getElementById('math').innerHTML = '<div class="error">Error: ' + error.message + '</div>';
            }
        }
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', renderMath);
        } else {
            renderMath();
        }
    </script>
</body>
</html>
  `;

  return (
    <View style={[styles.container, style]}>
      <WebView
        source={{ 
          html,
          baseUrl: Platform.OS === 'android' ? 'file:///android_asset/' : ''
        }}
        style={styles.webview}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        originWhitelist={['*']}
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        cacheEnabled={false}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#666" />
          </View>
        )}
        onMessage={(event) => {
          console.log('WebView message:', event.nativeEvent.data);
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView HTTP error:', nativeEvent);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  webview: {
    backgroundColor: 'transparent',
  },
});

export default MathView;
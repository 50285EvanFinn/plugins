/**
 * Agent Compatibility Plugin
 * 
 * Provides compatibility checks and utilities to ensure cursor agents
 * work correctly across different environments and configurations.
 */

import { PluginContext, CompatibilityResult, AgentCapability } from './types';

/** Minimum supported agent version */
const MIN_AGENT_VERSION = '0.1.0';

/** Maximum supported agent version (exclusive) */
const MAX_AGENT_VERSION = '2.0.0';

/**
 * Compares two semver version strings.
 * Returns -1 if a < b, 0 if a === b, 1 if a > b.
 */
export function compareVersions(a: string, b: string): number {
  const partsA = a.split('.').map(Number);
  const partsB = b.split('.').map(Number);

  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const numA = partsA[i] ?? 0;
    const numB = partsB[i] ?? 0;
    if (numA < numB) return -1;
    if (numA > numB) return 1;
  }

  return 0;
}

/**
 * Checks whether the given agent version is within the supported range.
 */
export function isVersionSupported(version: string): boolean {
  return (
    compareVersions(version, MIN_AGENT_VERSION) >= 0 &&
    compareVersions(version, MAX_AGENT_VERSION) < 0
  );
}

/**
 * Validates that the agent context exposes all required capabilities.
 */
export function checkCapabilities(
  context: PluginContext,
  required: AgentCapability[]
): CompatibilityResult {
  const missing: AgentCapability[] = [];

  for (const cap of required) {
    if (!context.capabilities.includes(cap)) {
      missing.push(cap);
    }
  }

  if (missing.length > 0) {
    return {
      compatible: false,
      reason: `Missing required capabilities: ${missing.join(', ')}`,
      missingCapabilities: missing,
    };
  }

  return { compatible: true };
}

/**
 * Main entry point called by the Cursor plugin host when the plugin is loaded.
 */
export function activate(context: PluginContext): void {
  const { agentVersion } = context;

  if (!isVersionSupported(agentVersion)) {
    console.warn(
      `[agent-compatibility] Agent version ${agentVersion} is outside the ` +
        `supported range [${MIN_AGENT_VERSION}, ${MAX_AGENT_VERSION}). ` +
        'Some features may not work as expected.'
    );
  }

  const result = checkCapabilities(context, [
    'file-read',
    'file-write',
    'terminal',
  ]);

  if (!result.compatible) {
    console.error(
      `[agent-compatibility] Compatibility check failed: ${result.reason}`
    );
    return;
  }

  console.log(
    `[agent-compatibility] Plugin activated successfully (agent v${agentVersion})`
  );
}

/**
 * Cleanup hook called when the plugin is deactivated.
 */
export function deactivate(): void {
  console.log('[agent-compatibility] Plugin deactivated.');
}
